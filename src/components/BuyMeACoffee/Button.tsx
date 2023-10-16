const BuyMeACoffeeButton = () => {
  return (
    <div className="h-[50px] w-[235px]">
      <a
        href="https://www.buymeacoffee.com/chaechaecod"
        target="_blank"
        rel="noreferrer noopener"
        className="h-full w-full"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=chaechaecod&button_colour=5F7FFF&font_colour=ffffff&font_family=Lato&outline_colour=000000&coffee_colour=FFDD00"
          alt="buy me a coffee"
        />
      </a>
    </div>
  );
};

export default BuyMeACoffeeButton;
