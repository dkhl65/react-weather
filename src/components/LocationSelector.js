function LocationSelector({ locations, onSelect }) {
  const handleClick = (i) => {
    if (typeof onSelect === "function") {
      onSelect(i);
    }
  };

  return (
    <div className="ui middle aligned selection list">
      {locations?.map(({ name, region, country }, i) => (
        <div key={i} className="item" onClick={() => handleClick(i)}>
          <div className="content">
            <h3 className="header">
              {name}, {region && region + ", "}
              {country}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LocationSelector;
