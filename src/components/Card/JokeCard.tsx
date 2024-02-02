import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { Link } from "expo-router";

const screenWidth = Dimensions.get("screen").width;
export const tinderCardWidth = Dimensions.get("screen").width * 0.8;

type TinderCard = {
  user: {
    image: string;
    text: string;
    xLink: string;
  };
  numOfCards: number;
  index: number;
  activeIndex: SharedValue<number>;
  onResponse: (a: boolean) => void;
};
export default function TinderCard({
  user,
  numOfCards,
  index,
  activeIndex,
  onResponse,
}: TinderCard) {
  const translationX = useSharedValue(0);

  const animatedCard = useAnimatedStyle(() => ({
    opacity: interpolate(
      activeIndex.value,
      [index - 1, index, index + 1],
      [1 - 1 / 5, 1, 1]
    ),

    transform: [
      {
        scale: interpolate(
          activeIndex.value,
          [index - 1, index, index + 1],
          [0.95, 1, 1]
        ),
      },

      {
        translateY: interpolate(
          activeIndex.value,
          [index - 1, index, index + 1],
          [-30, 0, 0]
        ),
      },

      {
        translateX: translationX.value,
      },

      {
        rotateZ: `${interpolate(
          translationX.value,
          [-screenWidth / 2, 0, screenWidth / 2],
          [-15, 0, 15]
        )}deg`,
      },
    ],
  }));

  const gesture = Gesture.Pan()
    .onChange((event) => {
      translationX.value = event.translationX;

      activeIndex.value = interpolate(
        Math.abs(translationX.value),
        [0, 500],
        [index, index + 0.8]
      );
    })

    .onEnd((event) => {
      if (Math.abs(event.velocityX) > 400) {
        translationX.value = withSpring(Math.sign(event.velocityX) * 500, {
          velocity: event.velocityX,
        });
        activeIndex.value = withSpring(index + 1);
        runOnJS(onResponse)(event.velocityX > 0);
      } else {
        translationX.value = withSpring(0);
      }
    });

  return (
    <>
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.card,
            animatedCard,
            {
              zIndex: numOfCards - index,
            },
          ]}
        >
          <Image
            style={[StyleSheet.absoluteFill, styles.image]}
            source={{ uri: user.image }}
            resizeMode="contain"
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={[StyleSheet.absoluteFillObject, styles.gradient]}
          />
          <View style={styles.footer}>
            <Text style={styles.name}>{user.text}</Text>
          </View>
        </Animated.View>
      </GestureDetector>
      {/* <View style={{ position: "absolute", bottom: 20 }}>
        <Link
          href={user.xLink}
          style={{
            backgroundColor: "#000",
            // paddingHorizontal: 50,
            width: 270,
            justifyContent: "center",
            alignItems:'center',
            textAlign:'center',
            paddingVertical: 10,
            borderRadius: 5,
          }}
          // onPress={() => (activeIndex.value = activeIndex.value + 1)}
        >
          <Text
            style={{
              textAlign: "center",
              alignSelf:'center',
              color: "white",
              
              fontFamily: "InterBold",
              fontSize: 24,
            }}
          >
            View on X
          </Text>
        </Link>
      </View> */}
    </>
  );
}
const styles = StyleSheet.create({
  card: {
    justifyContent: "flex-end",
    position: "absolute",

    // height: tinderCardWidth * 1.67,
    aspectRatio: 1 / 1.67,
    width: tinderCardWidth,
    // overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  name: {
    fontSize: 24,
    color: "white",
    fontFamily: "InterBold",
  },
  image: { borderRadius: 15, backgroundColor: "rgba(255,255,255,0.5)" },
  footer: {
    padding: 10,
  },
  gradient: {
    top: "50%",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
});
