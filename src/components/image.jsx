import Image from 'next/image';

// Function to convert Google Drive URL to a viewable format
const convertAndUseDriveUrl = (url) => {
  const match = url.match(/id=([^&]+)/);
  return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
};

const ImageSlider = ({ product }) => {
    console.log(product)
  return (
    <div>
      {product.images.map((img, index) => {
        const url = convertAndUseDriveUrl(img);
        return (
          <React.Fragment key={index}>
            <Image
              src={url}
              width={500} // Replace with the actual width of your image
              height={300} // Replace with the actual height of your image
              alt={product.name}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ImageSlider;
