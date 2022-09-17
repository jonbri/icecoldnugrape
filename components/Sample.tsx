import { useEffect, useState } from "react";

interface SampleProps {
  text: string;
  isGold: boolean;
}
const Sample = (props: SampleProps) => {
  return <div style={{ color: "gold" }}>{props.text}</div>;
};

export default Sample;
