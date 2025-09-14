import React from "react";
import Image from "next/image";

interface DashImagesProps {
  showFood?: boolean;
  className?: string;
}

const DashImages: React.FC<DashImagesProps> = ({
  className = "",
}) => (
  <div
    className={`relative w-full h-full overflow-hidden ${className} rounded-xl bg-gradient-to-tr from-white-400 via-white-300 to-white-200`}
  >
    {/* Vector principal */}
    <Image
      src="/assets/cfLogo.png"
      alt="Vector Dashboard"
      width={900}
      height={400}
      className="absolute right-0 bottom-0 pointer-events-none select-none"
      style={{ width: "900px", height: "500px" }}
      priority
    />
  </div>
);

export default DashImages;
