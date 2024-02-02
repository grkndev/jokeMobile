import { Button, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import JokeCard from "@/components/Card/JokeCard";
import { Link, Stack } from "expo-router";
import {
  useAnimatedReaction,
  useSharedValue,
  runOnJS,
} from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";

const profiles = [
  {
    id: 1,
    text: "Bizim de rock bar açma hayalimiz vardı: Dalya Rock",
    image: "http://ozlem.kayasaroglu.com/wp-content/uploads/2024/01/1.png",
    xLink: "https://x.com/elf_ozen/status/1734620706652987822?s=20",
  },
  {
    id: 2,
    text: "Tek lif var ısrar yok",
    image: "http://ozlem.kayasaroglu.com/wp-content/uploads/2024/01/2.png",
    xLink: "https://x.com/elf_ozen/status/1750427862220378367?s=20",
  },
  {
    id: 3,
    text: "Ee söyle bakalım eczane Efendi Macecik var mı?",
    image: "http://ozlem.kayasaroglu.com/wp-content/uploads/2024/01/3.png",
    xLink: "https://x.com/elf_ozen/status/1750184816937406475?s=20",
  },
  {
    id: 4,
    text: "Yeni postumu beğendiyseniz kanalıma abone olmayı ve bunun gibi daha fazla içerikten haberdar olmak için bildirimleri açmayı unutmayınız🌝",
    image: "http://ozlem.kayasaroglu.com/wp-content/uploads/2024/01/4.png",
    xLink: "https://x.com/elf_ozen/status/1749797116635951482?s=20",
  },
  {
    id: 5,
    text: "Sahanda iyisin Mehtap ama deplasman için aynı şeyi söyleyemiyorum",
    image: "http://ozlem.kayasaroglu.com/wp-content/uploads/2024/01/5.png",
    xLink: "https://x.com/elf_ozen/status/1749705834668478974?s=20",
  },
  {
    id: 6,
    text: "Numpadsiz klavye balkonsuz eve benzer",
    image: "http://ozlem.kayasaroglu.com/wp-content/uploads/2024/01/6.png",
    xLink: "https://x.com/elf_ozen/status/1749475117523230769?s=20",
  },
  {
    id: 7,
    text: "Mağaza kabanmasın diye almışlar",
    image: "http://ozlem.kayasaroglu.com/wp-content/uploads/2024/01/7.png",
    xLink: "https://x.com/elf_ozen/status/1748381422983807175?s=20",
  },
  {
    id: 8,
    text: "Hayırlı Cumalar🫶🏼",
    image: "http://ozlem.kayasaroglu.com/wp-content/uploads/2024/01/8.png",
    xLink: "https://x.com/elf_ozen/status/1748281145299435927?s=20",
  },
  {
    id: 9,
    text: "Iron Man",
    image: "http://ozlem.kayasaroglu.com/wp-content/uploads/2024/01/9.png",
    xLink: "https://x.com/elf_ozen/status/1747887384912331074?s=20",
  },
  {
    id: 10,
    text: "Kafaya takacak o kadar şey varken benim kafaya ördeği takmam şaka mı?",
    image: "http://ozlem.kayasaroglu.com/wp-content/uploads/2024/01/10.png",
    xLink: "https://x.com/elf_ozen/status/1752225269782286382?s=20",
  },
  {
    id: 11,
    text: "Şu Hakan Peker gofreti başlı başına bir öğün gibi yaa. Herhangi bir gofret veya çikolata gibi değil asla. Neyse ayda yılda bir yeriz olur bitter.",
    image: "http://ozlem.kayasaroglu.com/wp-content/uploads/2024/01/11.png",
    xLink: "https://x.com/elf_ozen/status/1752028925318865017?s=20",
  },
  {
    id: 12,
    text: "Microsoftun edgeli gelmiş diyebilir miyiz?",
    image: "http://ozlem.kayasaroglu.com/wp-content/uploads/2024/01/12.png",
    xLink: "https://x.com/elf_ozen/status/1751964648117526775?s=20",
  },
  {
    id: 13,
    text: "Bomba imha edilmek üzere",
    image: "http://ozlem.kayasaroglu.com/wp-content/uploads/2024/01/13.png",
    xLink: "https://x.com/elf_ozen/status/1751868125060932093?s=20",
  },
  {
    id: 14,
    text: "Ara Güler dediler. Aradım. Gülmedi.",
    image: "http://ozlem.kayasaroglu.com/wp-content/uploads/2024/01/14.png",
    xLink: "https://x.com/elf_ozen/status/1751595685990809647?s=20",
  },
  {
    id: 15,
    text: "Konuşamam yalnızca @mommy4_0",
    image: "http://ozlem.kayasaroglu.com/wp-content/uploads/2024/01/15.png",
    xLink: "https://x.com/elf_ozen/status/1750976208148287820?s=20",
  },
  {
    id: 16,
    text: "Bal gbii korumuşlar işte",
    image: "http://ozlem.kayasaroglu.com/wp-content/uploads/2024/01/16.png",
    xLink: "https://x.com/elf_ozen/status/1750806437419188425?s=20",
  },
];

export default function joke() {
  const [users, setUsers] = useState(profiles);
  const activeIndex = useSharedValue(0);
  const [index, setIndex] = useState(0);

  useAnimatedReaction(
    () => activeIndex.value,
    (value, prev) => {
      if (Math.floor(value) !== index) {
        runOnJS(setIndex)(Math.floor(value));
      }
    }
  );

  useEffect(() => {
    if (index > profiles.length - 3) {
      setUsers((usrs) => [...usrs, ...profiles.reverse()]);
    }
  }, [index]);

  const onResponse = (res: true | false) => {
    // console.log(res);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text
        style={{
          top: 70,
          position: "absolute",
          fontFamily: "InterBlack",
          fontSize: 28,
        }}
      >
        Elf ‘s Şaka App’i
      </Text>
      {users.map((user, index) => (
        <JokeCard
          key={`${user.id}-${index}`}
          user={user}
          numOfCards={profiles.length}
          index={index}
          activeIndex={activeIndex}
          onResponse={onResponse}
        />
      ))}

      <View style={{ position: "absolute", bottom: 20 }}>
      <Link
          href={users[index].xLink}
          style={{
            backgroundColor: "#000",
            // paddingHorizontal: 50,
            width: 270,
            justifyContent: "center",
            alignItems:'center',
            textAlign:'center',
            paddingVertical: 10,
            borderRadius: 5,
          }}        >
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
      </View>
    </View>
  );
}
