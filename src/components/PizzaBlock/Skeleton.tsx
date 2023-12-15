import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props: any) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="485" y="455" rx="2" ry="2" width="400" height="400" />
    <rect x="90" y="184" rx="0" ry="0" width="0" height="5" />
    <circle cx="139" cy="130" r="130" />
    <rect x="6" y="268" rx="0" ry="0" width="280" height="24" />
    <rect x="7" y="298" rx="11" ry="11" width="280" height="88" />
    <rect x="7" y="400" rx="21" ry="21" width="83" height="45" />
    <rect x="29" y="435" rx="0" ry="0" width="8" height="15" />
    <rect x="584" y="539" rx="0" ry="0" width="14" height="15" />
    <rect x="123" y="400" rx="9" ry="9" width="152" height="45" />
    <rect x="214" y="443" rx="0" ry="0" width="3" height="11" />
  </ContentLoader>
);

export default Skeleton;
