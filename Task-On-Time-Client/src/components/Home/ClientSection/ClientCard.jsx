const ClientCard = ({ image, text, span }) => {
  return (
    <div className={`w-full h-fit ${span} relative`}>
      <img src={image} alt="" className="w-full h-[250px] rounded-xl" />
      <div
        className={`w-full client-card-bg text-left p-4 rounded-b-xl absolute bottom-0`}
      >
        <h1 className="text-lg text-white font-semibold">{text}</h1>
      </div>
    </div>
  );
};

export default ClientCard;
