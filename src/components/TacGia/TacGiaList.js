import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const TacGiaList = ({ refresh }) => {
  const [tacGia, setTacGia] = useState([]);

  const fetchTacGia = async () => {
    const tacGiaSnapshot = await getDocs(collection(db, "tacGia"));
    setTacGia(
      tacGiaSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  };

  const handleDeleteTacGia = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa tác giả này?")) {
      await deleteDoc(doc(db, "tacGia", id));
      fetchTacGia();
    }
  };

  useEffect(() => {
    fetchTacGia();
  }, [refresh]);

  return (
    <div>
      <h1>Danh Sách Tác Giả</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Tên Tác Giả</th>
            <th>Năm Sinh</th>
            <th>Năm Mất</th>
            <th>Quê Quán</th>
            <th>Ảnh Chân Dung</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {tacGia.map((tg) => (
            <tr key={tg.id}>
              <td>{tg.tenTacGia}</td>
              <td>{tg.namSinh}</td>
              <td>{tg.namMat}</td>
              <td>{tg.queQuan}</td>
              <td>
                {tg.anhChanDung && (
                  <img
                    src={tg.anhChanDung}
                    alt={tg.tenTacGia}
                    style={styles.image}
                  />
                )}
              </td>
              <td>
                <button
                  onClick={() => handleDeleteTacGia(tg.id)}
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
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  image: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "50%",
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

export default TacGiaList;
