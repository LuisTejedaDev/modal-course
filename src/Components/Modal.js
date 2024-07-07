import { useEffect } from "react"
import {Keyboard, StyleSheet, useWindowDimensions} from "react-native"
import Animated, {Extrapolation, interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated"

/* type = 'translate' | 'fade' | 'scale' */

export default ({visibility = false, dismissable = true, handleDismiss = () => {}, type = 'translate', children}) => {
    
    const {height, width} = useWindowDimensions()

    const maxHeight = (height * 70) / 100
    const maxWidth = '90%'
    const animation = useSharedValue(0)

    useEffect(() => {
        handleAnimated()
    }, [visibility])

    const handleAnimated = () => {
        animation.value = withTiming(visibility ? 1 : 0, {duration: 750})
    }


    const backgroundStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            animation.value,
            [0, 1],
            ['rgba(0,0,0,0)', 'rgba(0,0,0,0.3)'],
            'RGB',
            Extrapolation.CLAMP
        )
    }))

    const translateStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateY: interpolate(
                    animation.value,
                    [0, 1],
                    [height, 0],
                    Extrapolation.CLAMP
                )
            }
        ]
    }))

    const fadeStyle = useAnimatedStyle(() => ({
        opacity: animation.value
    }))

    const scaleStyle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: animation.value
            }
        ]
    }))

    return(
        <>
            {/* Este es el contenedor del color de fondo del modal */}
            <Animated.View
                pointerEvents={visibility ? 'auto' : 'none'}
                onTouchStart={
                    dismissable 
                    ?
                        () => {
                            Keyboard.dismiss()
                            handleDismiss()
                        }
                    :
                        () => {}
                }
                style={[styles.container, {width: width, height: (height + 100)}, backgroundStyle]}>
            </Animated.View>

            {/* Contenedor de modal */}
            <Animated.View
                pointerEvents={visibility ? 'auto' : 'none'}
                style={[styles.modal, {maxHeight: maxHeight, maxWidth: maxWidth}, type === 'translate' ? translateStyle : type === 'fade' ? fadeStyle : scaleStyle]}>
                {
                    children
                }
            </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 20,
    },
    modal: {
        height: 'auto',
        position: 'absolute',
        zIndex: 30,
        overflow: 'hidden'
    }
})