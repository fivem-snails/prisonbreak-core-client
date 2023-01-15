const Location = (props: any) => (
  <section className="location">
    <img className="location-image" src={props.img} alt="location" />
    <p className="location-tex">{props.location}</p>
    <a className="location-button" href="#02">
      Spawn
    </a>
  </section>
);

export default Location;
