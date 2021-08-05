import React, { useState } from "react";
import { TProduct } from "@dubbie/@types/venduro.types";
import Image, { ImageProps } from "next/image";
import { useInterval } from "@Common";
type Props = {
  asset: TProduct["productAsset"];
} & Partial<ImageProps>;

function ImageRamdom({ asset, ...args }: Props) {
  // const [image, setImage] = useState<string>(assets[0].url);
  // useInterval(() => {
  //   const ram = Math.floor(Math.random() * assets.preview);
  //   setImage(assets[ram].url);
  // }, 3000);

  return (
    <Image src={asset.preview} width={args.width} height={args.height}></Image>
  );
}

export default ImageRamdom;
