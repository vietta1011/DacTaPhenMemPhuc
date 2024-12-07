import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const SachList = ({ refresh }) => {
  const [sach, setSach] = useState([]);
  const [loaiSach, setLoaiSach] = useState({});
  const [tacGia, setTacGia] = useState({});

  const fetchSach = async () => {
    const sachSnapshot = await getDocs(collection(db, "sach"));
    setSach(sachSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const fetchLoaiSach = async () => {
    const loaiSachSnapshot = await getDocs(collection(db, "loaiSach"));
    const loaiSachMap = {};
    loaiSachSnapshot.docs.forEach((doc) => {
      loaiSachMap[doc.id] = doc.data().tenLoaiSach;
    });
    setLoaiSach(loaiSachMap);
  };

  const fetchTacGia = async () => {
    const tacGiaSnapshot = await getDocs(collection(db, "tacGia"));
    const tacGiaMap = {};
    tacGiaSnapshot.docs.forEach((doc) => {
      tacGiaMap[doc.id] = doc.data().tenTacGia;
    });
    setTacGia(tacGiaMap);
  };

  const handleDeleteSach = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sách này?")) {
      await deleteDoc(doc(db, "sach", id));
      fetchSach();
    }
  };

  useEffect(() => {
    fetchSach();
    fetchLoaiSach();
    fetchTacGia();
  }, [refresh]);

  return (
    <div>
      <h1>Danh Sách Sách</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Tên Sách</th>
            <th>Loại Sách</th>
            <th>Tác Giả</th>
            <th>Năm Xuất Bản</th>
            <th>Số Lượng</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {sach.map((s) => (
            <tr key={s.id}>
              <td>{s.tenSach}</td>
              <td>{loaiSach[s.maLoaiSach] || "N/A"}</td>
              <td>{tacGia[s.maTacGia] || "N/A"}</td>
              <td>{s.namXuatBan}</td>
              <td>{s.soLuong}</td>
              <td>
                <button
                  onClick={() => handleDeleteSach(s.id)}
                  style={styles.deleteButton}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    textAlign: "center", // Center content for all cells
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  th: {
    borderBottom: "1px solid #ddd",
    padding: "10px",
    textAlign: "center",
    backgroundColor: "#f4f4f4",
  },
  td: {
    borderBottom: "1px solid #ddd",
    padding: "10px",
    textAlign: "center",
  },
};

export default SachList;
