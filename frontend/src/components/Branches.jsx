function Branches() {
  const branches = [
  {
    name: "F-7 New Islamabad",
    address: "13-K Bhittai Road",
    map: "https://www.google.com/maps/search/?api=1&query=13-K+Bhittai+Road+Islamabad&hl=en"
  },
  {
    name: "F-10 Markaz Islamabad",
    address: "Plot no 2-D Sector F-10 Islamabad",
    map: "https://www.google.com/maps/search/?api=1&query=Plot+no+2-D+Sector+F-10+Islamabad&hl=en"
  },
  {
    name: "I-8 Markaz Islamabad",
    address: "Shop No. 26, Pakland Plaza, I-8 Markaz, Islamabad",
    map: "https://www.google.com/maps/search/?api=1&query=Shop+No.+26+Pakland+Plaza+I-8+Markaz+Islamabad&hl=en"
  }
  ];

  return (
    <section className="branches-page">
      <h1>Branch Locator</h1>

      <p>Find a CraveHub branch near you.</p>

      <div className="branches-list">
        {branches.map((branch) => (
          <div className="branch-card" key={branch.name}>
            <h2>{branch.name}</h2>
            <p>📍 {branch.address}</p>

            <button onClick={() => window.open(branch.map, "_blank")}>
              VIEW LOCATION
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Branches;