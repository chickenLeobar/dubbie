import React, { useState } from "react";
import { Product } from "@dubbie/@types/eccomerce.types";
import Image, { ImageProps } from "next/image";
import { useInterval } from "@Common";
type Props = {
  assets: Product["assets"];
} & Partial<ImageProps>;

function ImageRamdom({ assets, ...args }: Props) {
  const [image, setImage] = useState<string>(assets[0].url);
  useInterval(() => {
    const ram = Math.floor(Math.random() * assets.length);
    setImage(assets[ram].url);
  }, 3000);

  return <Image src={image} width={args.width} height={args.height}></Image>;
}

export default ImageRamdom;
