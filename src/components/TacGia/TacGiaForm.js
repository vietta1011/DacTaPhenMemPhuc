import React, { useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const TacGiaForm = ({ onAddSuccess }) => {
  const [tenTacGia, setTenTacGia] = useState("");
  const [namSinh, setNamSinh] = useState("");
  const [namMat, setNamMat] = useState("");
  const [queQuan, setQueQuan] = useState("");
  const [anhChanDung, setAnhChanDung] = useState(null);

  const handleAddTacGia = async (e) => {
    e.preventDefault(); // Ngăn việc tải lại trang
    if (!tenTacGia) {
      alert("Vui lòng nhập tên tác giả!");
      return;
    }

    let imageURL = null;
    if (anhChanDung) {
      const reader = new FileReader();
      reader.onload = async () => {
        imageURL = reader.result;
        await addDoc(collection(db, "tacGia"), {
          tenTacGia,
          namSinh,
          namMat,
          queQuan,
          anhChanDung: imageURL,
        });
        setTenTacGia("");
        setNamSinh("");
        setNamMat("");
        setQueQuan("");
        setAnhChanDung(null);
        alert("Thêm tác giả thành công!");
        onAddSuccess();
      };
      reader.readAsDataURL(anhChanDung);
    } else {
      await addDoc(collection(db, "tacGia"), {
        tenTacGia,
        namSinh,
        namMat,
        queQuan,
      });
      setTenTacGia("");
      setNamSinh("");
      setNamMat("");
      setQueQuan("");
      setAnhChanDung(null);
      alert("Thêm tác giả thành công!");
      onAddSuccess();
    }
  };

  const handleImageChange = (e) => {
    setAnhChanDung(e.target.files[0]);
  };

  return (
    <form onSubmit={handleAddTacGia} style={styles.form}>
      <h2 style={styles.title}>Thêm Tác Giả</h2>
      <div style={styles.formGroup}>
        <label htmlFor="tenTacGia" style={styles.label}>
          Tên Tác Giả:
        </label>
        <input
          id="tenTacGia"
          type="text"
          value={tenTacGia}
          onChange={(e) => setTenTacGia(e.target.value)}
          style={styles.input}
          placeholder="Nhập tên tác giả"
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="namSinh" style={styles.label}>
          Năm Sinh:
        </label>
        <input
          id="namSinh"
          type="text"
          value={namSinh}
          onChange={(e) => setNamSinh(e.target.value)}
          style={styles.input}
          placeholder="Nhập năm sinh"
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="namMat" style={styles.label}>
          Năm Mất:
        </label>
        <input
          id="namMat"
          type="text"
          value={namMat}
          onChange={(e) => setNamMat(e.target.value)}
          style={styles.input}
          placeholder="Nhập năm mất"
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="queQuan" style={styles.label}>
          Quê Quán:
        </label>
        <input
          id="queQuan"
          type="text"
          value={queQuan}
          onChange={(e) => setQueQuan(e.target.value)}
          style={styles.input}
          placeholder="Nhập quê quán"
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="anhChanDung" style={styles.label}>
          Ảnh Chân Dung:
        </label>
        <input
          id="anhChanDung"
          type="file"
          onChange={handleImageChange}
          style={styles.input}
        />
      </div>
      <button type="submit" style={styles.button}>
        Thêm Tác Giả
      </button>
    </form>
  );
};

const styles = {
  form: {
    margin: "20px 0",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#fff",
  },
  title: {
    marginBottom: "15px",
    fontSize: "20px",
    textAlign: "center",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "8px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    display: "block",
    width: "100%",
    padding: "10px",
    backgroundColor: "#1abc9c",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default TacGiaForm;
