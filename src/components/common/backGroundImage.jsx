import Image from "next/image";

const BackGroundImage = ({
   src,
   height = 100,
   width = 100,
   alt = "alt not defined",
}) => {
   return (
      <Image
         src={src}
         width={width}
         height={height}
         alt={alt}
         priority={true}
         className="h-full w-auto object-cover relative -z-10"
      />
   );
};

export default BackGroundImage;
