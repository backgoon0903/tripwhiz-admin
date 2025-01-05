import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../AuthState";
import { login, LoginResponse } from "../../api/authAPI";
import { IAdmin } from "../../types/admin";
import { IStoreOwner } from "../../types/storeOwner";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

function LoginComponent() {
  const [credentials, setCredentials] = useState({ id: "", pw: "", role: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setAdmin, setStoreowner, logoutAdmin, logoutStoreowner } = useAuthStore();

  // Correctly typed handleChange function
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data: LoginResponse = await login(credentials.id, credentials.pw, credentials.role);

      if (data.accessToken && data.refreshToken) {
        if (credentials.role === "ADMIN") {
          logoutStoreowner(); // Reset store owner state
          const adminData = data as IAdmin;
          setAdmin(adminData.aname, adminData.id, adminData.accessToken, adminData.refreshToken);
        } else if (credentials.role === "STOREOWNER") {
          logoutAdmin(); // Reset admin state
          const storeOwnerData = data as IStoreOwner;
          setStoreowner(
            storeOwnerData.sname,
            storeOwnerData.id,
            storeOwnerData.accessToken,
            storeOwnerData.refreshToken
          );
        }
        alert("Login successful!");
        navigate("/app");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f4f4f9"
      px={2}
    >
      <Card sx={{ maxWidth: 400, width: "100%", boxShadow: 3 }}>
        <CardHeader
          title="Login"
          sx={{ textAlign: "center", bgcolor: "#1976d2", color: "white", py: 2 }}
        />
        <CardContent>
          {error && (
            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                fullWidth
                label="ID"
                name="id"
                value={credentials.id}
                onChange={handleChange} // No more red line
                variant="outlined"
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Password"
                name="pw"
                type="password"
                value={credentials.pw}
                onChange={handleChange} // No more red line
                variant="outlined"
                required
              />
            </Box>
            <Box mb={2}>
              <FormControl fullWidth required>
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={credentials.role}
                  onChange={handleChange} // No more red line
                  label="Role"
                >
                  <MenuItem value="" disabled>
                    Select Role
                  </MenuItem>
                  <MenuItem value="ADMIN">Admin</MenuItem>
                  <MenuItem value="STOREOWNER">Store Owner</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box mb={2}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </Box>
          </form>
          <Button onClick={handleSignUp} variant="outlined" color="primary" fullWidth>
            Sign Up
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LoginComponent;
