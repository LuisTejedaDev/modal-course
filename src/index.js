import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {Modal} from "./Components"
import {useState} from "react"

export default () => {

    const [visibility, setVisibility] = useState(false)

    return(
        <View style={styles.container}>

            <TouchableOpacity
                style={{height: 60, width: '85%', backgroundColor: '#002b5c', justifyContent: 'center', alignItems: 'center'}}
                onPress={() => setVisibility(true)}
            >
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff', textAlign: 'center'}}>Ofertas</Text>
            </TouchableOpacity>

            <Modal
                visibility={visibility}
                dismissable={true}
                handleDismiss={() => setVisibility(false)}
                type={"fade"}
            >
                <View style={styles.saleContainer}>
                    <View style={styles.sections}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#002b5c', textAlign: 'center'}}>Encuentra las mejores Ofertas de HotSale!</Text>
                    </View>

                    <Image
                        source={{uri: 'https://images.vexels.com/content/205437/preview/online-shopping-sale-stroke-icon-d2e336.png'}}
                        style={{height: 250, width: 250, marginVertical: 20}}
                    />

                    <View style={styles.sections}>
                        <TouchableOpacity style={{height: 55, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#002b5c'}}>
                            <Text style={{fontSize: 17, fontWeight: 'bold', color: '#fff', textAlign: 'center'}}>Comprar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    saleContainer: {
        height: 'auto',
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 14
    },
    sections: {
        height: 'auto',
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center'
    }
})