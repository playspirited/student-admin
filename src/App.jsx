import { useState, useEffect } from "react";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    course: "",
    enrollmentDate: "",
  });

  const [students, setStudents] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          course: formData.course,
          enrollment_date: formData.enrollmentDate,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          course: "",
          enrollmentDate: "",
        });
        fetchStudents();
      } else {
        alert(data.error || "Failed to add student");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add student");
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/students");
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Add Student</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            style={styles.input}
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
          <input
            style={styles.input}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            style={styles.input}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
          />
          <select
            style={styles.input}
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value="">Select Course</option>
            <option value="ICT">ICT</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
          </select>
          <input
            style={styles.input}
            type="date"
            name="enrollmentDate"
            value={formData.enrollmentDate}
            onChange={handleChange}
            required
          />
          <button style={styles.button} type="submit">
            Submit
          </button>
        </form>
      </div>

      <div style={styles.card}>
        <h2 style={styles.title}>All Students</h2>
        <ul style={styles.list}>
          {students.map((s) => (
            <li key={s.id} style={styles.listItem}>
              <strong>{s.first_name} {s.last_name}</strong>
              <span>{s.course}</span>
              <span>{new Date(s.enrollment_date).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "40px",
    padding: "40px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "#f7f9fc",
    minHeight: "100vh",
  },
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    width: "350px",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
    transition: "0.2s",
  },
  button: {
    padding: "12px",
    backgroundColor: "#0078d7",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "0.2s",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    background: "#f0f4f8",
    borderRadius: "8px",
  },
};

export default App;
