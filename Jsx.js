let customers = [];
let tables = [
  "A1",
  "A2",
  "A3",
  "A4",
  "A5",
  "B1",
  "B2",
  "B3",
  "B4",
  "B5",
  "C1",
  "C2",
  "C3",
  "C4",
  "C5",
  "D1",
  "D2",
  "D3",
  "D4",
  "D5",
  "E1",
  "E2",
  "E3",
  "E4",
  "E5",
];
const capacity = 25;
let seatsLeft = 25;
let guestCountRef = React.createRef();
let guestNameRef = React.createRef();
let roomTableRef = React.createRef();
let phoneNumberRef = React.createRef();

//create clear input handler here
function clearInputs() {
  guestCountRef.current.value = "";
  guestNameRef.current.value = "";
  roomTableRef.current.value = "";
  phoneNumberRef.current.value = "";
}

//create checkout handler here
function handleCheckOut(key) {
  if (customers[key].status == "Click to Checkout") {
    customers[key].checkOut = true;
    customers[key].status = "Served";
    seatsLeft += parseInt(customers[key].count);
    rootElement.render(<App />);
  } else {
    alert("Customer already checkedout !");
  }
}

// Create check name handler here
const checkIfEntryExists = (name) => {
  let bool = false;
  bool = customers.find(
    (customer) => customer.name === name && !customer.checkOut
  );
  return bool;
};

// Create delete handler here
function handleDelete(key) {
  let removedEntry = customers.splice(key, 1);
  if (!removedEntry[0].checkOut) {
    seatsLeft += parseInt(removedEntry[0].count);
  }
  rootElement.render(<App />);
}

// Create form submit handler here
function handleCustomer(e) {
  e.preventDefault();
  if (guestCountRef.current.value > seatsLeft) {
    alert("Guest count exceeds capacity.");
    return;
  }
  if (checkIfEntryExists(guestNameRef.current.value)) {
    alert("User already exists.");
    return;
  }

  let customer = {
    count: guestCountRef.current.value,
    name: guestNameRef.current.value,
    phone: phoneNumberRef.current.value,
    room: roomTableRef.current.value,
    checkIn: new Date().toLocaleTimeString(),
    checkOut: false,
    status: "Click to Checkout",
    delete: "Delete",
  };
  customers.unshift(customer);
  seatsLeft -= guestCountRef.current.value;
  clearInputs();
  rootElement.render(<App />);
}

// Form Component
const Form = () => (
  <form onSubmit={handleCustomer}>
    <input
      type="number"
      ref={guestCountRef}
      placeholder="Guest Count"
      required
    />
    <input
      type="text"
      ref={guestNameRef}
      placeholder="Primary Guest Name"
      required
    />
    <label htmlFor="room">Choose a Room/Table:</label>
    <select
      ref={roomTableRef}
      placeholder="Room / Table Number"
      name="room"
      required
    >
      {tables.map((item, index) => (
        <option key={index}>{item}</option>
      ))}
    </select>
    <input
      type="tel"
      ref={phoneNumberRef}
      placeholder="Phone Number"
      required
    />
    <button> Add Entry </button>
  </form>
);

// Table Component
const Table = () => (
  <table border="1px" style={{ margin: "auto" }}>
    <thead>
      <tr>
        <th> Count </th>
        <th> Name </th>
        <th> Phone </th>
        <th> Room/Table </th>
        <th> Check In </th>
        <th> Check Out </th>
        <th> Status </th>
        <th> Remove Entry </th>
      </tr>
    </thead>

    <tbody>
      {customers.map((customer, id) => (
        <tr key={id}>
          <td> {customer.count} </td>
          <td> {customer.name} </td>
          <td> {customer.phone} </td>
          <td> {customer.room} </td>
          <td> {customer.checkIn} </td>

          <td>{customer.checkOut ? new Date().toLocaleTimeString() : "-"}</td>

          <td className={customer.checkOut ? "served" : "dining"}>
            <a onClick={() => handleCheckOut(id)}>{customer.status} </a>
          </td>

          <td>
            <a onClick={() => handleDelete(id)}> {customer.delete}</a>{" "}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

// App Component
const App = () => (
  <div className="App" style={{ textAlign: "center" }}>
    <div>
      <h1> Customer Management App </h1>
      <h2>Total Capacity: {capacity} </h2>
      <h2>Seats Left: {seatsLeft} </h2>
    </div>

    {/* Create a form here */}
    <Form />
    {/* Complete TABLE to show records of customers */}
    <Table />
  </div>
);

const rootElement = ReactDOM.createRoot(document.getElementById("root"));
rootElement.render(<App />);