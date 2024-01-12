import Script from 'next/script';

const BuyMeACoffeeWidget = () => {
  return (
    <Script
      data-name="BMC-Widget"
      data-cfasync="false"
      src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
      data-id="chaechaecod"
      data-description="Support me on Buy me a coffee!"
      data-message="저희 봇이랑 놀아주셔서 감사합니다! "
      data-color="#5F7FFF"
      data-position="Right"
      data-x_margin="10"
      data-y_margin="100"
      onLoad={() => {
        const evt = new Event('DOMContentLoaded', { bubbles: false, cancelable: false });
        window.dispatchEvent(evt);
      }}
    />
  );
};

export default BuyMeACoffeeWidget;
