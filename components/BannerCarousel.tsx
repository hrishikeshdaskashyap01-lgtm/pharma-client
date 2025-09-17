// client/components/BannerCarousel.tsx
import React, { useRef, useEffect, useState } from "react";
import { View, ScrollView, Image, Dimensions, StyleSheet, Platform } from "react-native";

const { width } = Dimensions.get("window");

const banners = [
  // remote placeholder images so bundler won't fail — replace later with local requires if you like
  "https://via.placeholder.com/900x300.png?text=Banner+1",
  "https://via.placeholder.com/900x300.png?text=Banner+2",
  "https://via.placeholder.com/900x300.png?text=Banner+3",
];

export default function BannerCarousel() {
  const scrollRef = useRef<ScrollView | null>(null);
  const [index, setIndex] = useState(0);

  // auto slide every 3s
  useEffect(() => {
    const id = setInterval(() => {
      const next = (index + 1) % banners.length;
      setIndex(next);
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ x: next * width, animated: true });
      }
    }, 3000);
    return () => clearInterval(id);
  }, [index]);

  // adjust for web where width can change — keep it simple for now
  return (
    <View style={styles.wrapper}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const x = e.nativeEvent.contentOffset.x;
          const newIndex = Math.round(x / width);
          setIndex(newIndex);
        }}
      >
        {banners.map((uri, i) => (
          <Image
            key={i}
            source={{ uri }}
            style={[styles.img, { width }]}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 200,
    marginBottom: 16,
    backgroundColor: "#f2f2f2",
  },
  img: {
    height: "100%",
  },
});
