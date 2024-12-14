import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axiosInstance from "../../helpers/axios";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({});
  const usersPerPage = 10;

  const getUserData = async (page = 1) => {
    try {
      const res = await axiosInstance.get("fetch-user", {
        params: { page, limit: usersPerPage },
      });
      console.log("🚀 ~ getUserData ~ res:", res)
      setUsers(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const updateUser = async () => {
    try {
      const res = await axiosInstance.post("update-user", formData);
      if (res.status === 200) {
        alert("User updated successfully");
        setModalShow(false);
        getUserData(currentPage);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        const res = await axiosInstance.delete(`delete-user/${id}`);
        if (res.status === 200) {
          alert("User deleted successfully");
          getUserData(currentPage);
        } else {
          alert(res.data.message);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  useEffect(() => {
    getUserData(currentPage);
  }, [currentPage]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData(user);
    setModalShow(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Access</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{(currentPage - 1) * usersPerPage + index + 1}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.access}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleEdit(user)}
                  style={{ marginRight: "5px" }}
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          style={{ marginRight: "5px" }}
        >
          Previous
        </Button>
        <span style={{ margin: "0 10px" }}>Page {currentPage} of {totalPages}</span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="firstname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                value={formData.firstname || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="lastname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                value={formData.lastname || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="access">
              <Form.Label>Access</Form.Label>
              <Form.Control
                as="select"
                name="access"
                value={formData.access || ""}
                onChange={handleChange}
              >
                <option value="users">Users</option>
                <option value="superuser">Superuser</option>
                <option value="admin">Admin</option>
                <option value="sales">Sales</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={updateUser}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};
