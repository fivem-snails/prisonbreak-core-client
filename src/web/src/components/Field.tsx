const Field = (props: any) => (
  <section className="field">
    <label htmlFor={props.labelFor}>{props.label}</label>

    <div className="input-wrapper">
      {props.icon}
      <input
        className="input"
        id={props.id}
        type={props.type}
        min={props.min}
        max={props.max}
        placeholder={props.placeholder}
        required={true}
        value={props.value}
        onChange={props.onchange}
      />
    </div>
  </section>
);

export default Field;
