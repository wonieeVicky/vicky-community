import { useMemo } from "react";
import { Platform, type KeyboardAvoidingViewProps } from "react-native";
import {
  KeyboardAwareScrollView,
  type KeyboardAwareScrollViewProps
} from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useKeyboard from "./useKeyboard";

type UsePlatformKeyboardContainerOptions = {
  contentContainerStyle?: KeyboardAvoidingViewProps["contentContainerStyle"];
  behavior?: KeyboardAvoidingViewProps["behavior"];
  /**
   * 안드로이드에서 키보드가 보일 때 적용할 추가 오프셋(px)
   * 기본값 100
   */
  androidOffsetWhenVisible?: number;
};

type IOSProps = Partial<KeyboardAwareScrollViewProps>;
type AndroidProps = Partial<KeyboardAvoidingViewProps>;

function usePlatformKeyboardContainer(
  options: UsePlatformKeyboardContainerOptions
) {
  const {
    contentContainerStyle,
    behavior = "height",
    androidOffsetWhenVisible = 100
  } = options;

  const insets = useSafeAreaInsets();
  const { isKeyboardVisible } = useKeyboard();

  const isIOS = Platform.OS === "ios";

  const Container = (isIOS
    ? KeyboardAwareScrollView
    : (require("react-native")
        .KeyboardAvoidingView as unknown)) as unknown as React.ComponentType<any>;

  const containerProps = useMemo<IOSProps | AndroidProps>(() => {
    if (isIOS) {
      const iosProps: IOSProps = {
        contentContainerStyle,
        keyboardShouldPersistTaps: "handled"
      };
      return iosProps;
    }

    const androidProps: AndroidProps = {
      contentContainerStyle,
      behavior,
      keyboardVerticalOffset: isKeyboardVisible
        ? androidOffsetWhenVisible
        : insets.bottom
    };
    return androidProps;
  }, [
    isIOS,
    contentContainerStyle,
    behavior,
    androidOffsetWhenVisible,
    isKeyboardVisible,
    insets.bottom
  ]);

  return { Container, containerProps } as const;
}

export default usePlatformKeyboardContainer;
