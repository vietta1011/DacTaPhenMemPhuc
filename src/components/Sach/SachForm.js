import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";

const SachForm = ({ onAddSuccess }) => {
  const [tenSach, setTenSach] = useState("");
  const [maLoaiSach, setMaLoaiSach] = useState("");
  const [maTacGia, setMaTacGia] = useState("");
  const [namXuatBan, setNamXuatBan] = useState("");
  const [soLuong, setSoLuong] = useState(0);

  const [loaiSach, setLoaiSach] = useState([]);
  const [tacGia, setTacGia] = useState([]);

  const fetchLoaiSach = async () => {
    const querySnapshot = await getDocs(collection(db, "loaiSach"));
    setLoaiSach(
      querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  };

  const fetchTacGia = async () => {
    const querySnapshot = await getDocs(collection(db, "tacGia"));
    setTacGia(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchLoaiSach();
    fetchTacGia();
  }, []);

  const handleAddSach = async (e) => {
    e.preventDefault(); // Ngăn việc tải lại trang
    if (!tenSach || !maLoaiSach || !maTacGia || !namXuatBan || soLuong <= 0) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    await addDoc(collection(db, "sach"), {
      tenSach,
      maLoaiSach,
      maTacGia,
      namXuatBan: Number(namXuatBan),
      soLuong: Number(soLuong),
    });
    setTenSach("");
    setMaLoaiSach("");
    setMaTacGia("");
    setNamXuatBan("");
    setSoLuong(0);
    alert("Thêm sách thành công!");
    onAddSuccess();
  };

  return (
    <form onSubmit={handleAddSach} style={styles.form}>
      <h2 style={styles.title}>Thêm Sách</h2>
      <div style={styles.formGroup}>
        <label htmlFor="tenSach" style={styles.label}>
          Tên Sách:
        </label>
        <input
          id="tenSach"
          type="text"
          value={tenSach}
          onChange={(e) => setTenSach(e.target.value)}
          style={styles.input}
          placeholder="Nhập tên sách"
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="maLoaiSach" style={styles.label}>
          Loại Sách:
        </label>
        <select
          id="maLoaiSach"
          value={maLoaiSach}
          onChange={(e) => setMaLoaiSach(e.target.value)}
          style={styles.input}
        >
          <option value="">Chọn loại sách</option>
          {loaiSach.map((ls) => (
            <option key={ls.id} value={ls.id}>
              {ls.tenLoaiSach}
            </option>
          ))}
        </select>
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="maTacGia" style={styles.label}>
          Tác Giả:
        </label>
        <select
          id="maTacGia"
          value={maTacGia}
          onChange={(e) => setMaTacGia(e.target.value)}
          style={styles.input}
        >
          <option value="">Chọn tác giả</option>
          {tacGia.map((tg) => (
            <option key={tg.id} value={tg.id}>
              {tg.tenTacGia}
            </option>
          ))}
        </select>
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="namXuatBan" style={styles.label}>
          Năm Xuất Bản:
        </label>
        <input
          id="namXuatBan"
          type="number"
          value={namXuatBan}
          onChange={(e) => setNamXuatBan(e.target.value)}
          style={styles.input}
          placeholder="Nhập năm xuất bản"
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="soLuong" style={styles.label}>
          Số Lượng:
        </label>
        <input
          id="soLuong"
          type="number"
          value={soLuong}
          onChange={(e) => setSoLuong(e.target.value)}
          style={styles.input}
          placeholder="Nhập số lượng"
        />
      </div>
      <button type="submit" style={styles.button}>
        Thêm Sách
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

export default SachForm;
