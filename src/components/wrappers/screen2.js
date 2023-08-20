import React from 'react'
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native'
import BGMask from '@/assets/imgs/BGMask.png'
import { SCREEN_BACKGROUND } from '@/theme/colors'
import { RH, RW } from '@/theme/utils'
import { IS_IOS } from '@/constants'
import FastImage from 'react-native-fast-image'

const ScreenMask2 = ({ children, style }) => {
  const CustomTouchableNativeFeedback = Keyboard.isVisible() ? TouchableNativeFeedback : View
  return (
    <ImageBackground
      source={BGMask}
      imageStyle={styles.bgMask}
      style={{ ...styles.container, ...style }}
    >
      <View
        style={{
          flex: 1,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
        }}
      >
        <FastImage
          resizeMode="contain"
          style={{ width: RW(360), position: 'absolute', height: RW(360) }}
          source={require('@/assets/bgLogo.png')}
        />
        <View
          style={{
            width: RW(360),
            height: RW(360),
            borderRadius: RW(180),
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
        />
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        {...(Platform.OS === 'ios'
          ? {
              behavior: 'padding',
              keyboardVerticalOffset: RH(10),
              enabled: true,
            }
          : {})}
      >
        <CustomTouchableNativeFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
          <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
        </CustomTouchableNativeFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

export default ScreenMask2

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: RW(16),
    backgroundColor: SCREEN_BACKGROUND,
  },
  bgMask: {
    top: IS_IOS ? RH(-35) : RH(-15),
    position: 'absolute',
  },
})
