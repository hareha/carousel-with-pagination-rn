import React from "react";
import { TouchableOpacity, View, Animated } from "react-native";
import { PressablePaginationProps } from "../Interfaces";
import { styles } from "./PressablePagination.styles";

const PressablePagination = (props: PressablePaginationProps) => {
  return (
    <>
      <View
        style={styles.parentContainer(
          props.indicatorHeight ? props.indicatorHeight[1] + 5 : 20,
          props.paginataionBackgroundColor
        )}
      >
        {props.data.map((_, idx) => {
          const inputRange = [
            (idx - 1) * props.itemWidth,
            idx * props.itemWidth,
            (idx + 1) * props.itemWidth,
          ];
          const indicatorWidth = props.scrollX.interpolate({
            inputRange,
            outputRange: props.indicatorWidth,
            extrapolate: "clamp",
          });
          const indicatorHeight = props.scrollX.interpolate({
            inputRange,
            outputRange: props.indicatorHeight,
            extrapolate: "clamp",
          });
          const backgroundColor = props.scrollX.interpolate({
            inputRange,
            outputRange: props.indicatorColor,
            extrapolate: "clamp",
          });
          const fontColor = props.scrollX.interpolate({
            inputRange,
            outputRange: ['#AFB8C1','white','#AFB8C1'],
            extrapolate: "clamp",
          });
          return (
            <TouchableOpacity
              key={idx}
              testID={`pagination-indicator-${idx}`}
              onPress={() => props.getIndex(idx)}
              style={styles.buttonContainer(props.indicatorHorizontalPadding)}
            >
              <Animated.View
                key={idx.toString()}
                style={styles.buttonStyle(
                  indicatorWidth,
                  indicatorHeight,
                  backgroundColor,
                  props.inidicatorBorderRadius
                )}
              >
                <Animated.Text style={fontColorStyle(fontColor)}>
                  {_.title}
                </Animated.Text>
              </Animated.View>

            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

const fontColorStyle = (
  color: Animated.AnimatedInterpolation<string | number>,
): Animated.Animated => {
  return {
    color,
    fontSize:17,
    fontWeight:700
  };
};

export default PressablePagination;
