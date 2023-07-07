"use client";
import { useState } from "react";

function crc8Maxim(data: Uint8Array): number {
  const len = data.length;
  let res = 0x00;
  const crcPoly = 0x31;

  for (let i = 0; i < len; i++) {
    res ^= data[i];
    for (let j = 0; j < 8; j++) {
      if (res & 0x80) {
        res = (res << 1) ^ crcPoly;
      } else {
        res <<= 1;
      }
    }
  }

  res %= 256;

  console.debug(res.toString(16));

  return res;
}

function parseHexList(str: string): number[] {
  const hexList = str.split(" ");
  return hexList.map((hex) => parseInt(hex, 16));
}

function parseByteList(str: string): Uint8Array {
  const bytes = str.split(" ");
  const uint8arr = new Uint8Array(bytes.length);

  bytes.forEach((byte, index) => {
    uint8arr[index] = parseInt(byte, 16);
  });

  console.debug(uint8arr);

  return uint8arr; 
}

export default function CrcCalculator() {
  const [text, setText] = useState<string>("");

  function handleTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value);
  }

  return (
    <div>
      <textarea value={text} onChange={handleTextChange} className="w-full h-16"/>
      {/* <p>Character count: {text.length}</p> */}
      <p>Result: 0x{crc8Maxim(parseByteList(text)).toString(16)}</p>
    </div>
  );
}
