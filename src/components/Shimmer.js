const Shimmer = () => {
  return (
    <div className="restaurantlist">
      {Array(10)
        .fil("")
        .map((e, index) => (
          <div key={index}> className="shimmer-card"</div>
        ))}
    </div>
  );
};

export default Shimmer;
