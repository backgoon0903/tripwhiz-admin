import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAdmin } from "../../api/adminAPI";
import { ICreateAdmin } from '../../types/admin';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Typography,
    TextField,
    Button,
} from "@mui/material";

function SignUpComponent() {
    const [adminData, setAdminData] = useState<ICreateAdmin>({
        aname: "",
        id: "",
        pw: "",
        role: "ADMIN",
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAdminData({
            ...adminData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createAdmin(adminData);
            setSuccess("Admin registered successfully!");
            setError(null);
            setTimeout(() => navigate("/login"), 2000);
        } catch (err: any) {
            setError(err.message || "Admin registration failed");
            setSuccess(null);
        }
    };

    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#f9f9f9"
        px={2}
      >
          <Card sx={{ maxWidth: 400, width: "100%", boxShadow: 3 }}>
              <CardHeader
                title="Admin Registration"
                sx={{
                    textAlign: "center",
                    bgcolor: "#1976d2",
                    color: "white",
                    py: 2,
                }}
              />
              <CardContent>
                  {error && (
                    <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                  )}
                  {success && (
                    <Typography color="success" variant="body2" sx={{ mb: 2 }}>
                        {success}
                    </Typography>
                  )}
                  <form onSubmit={handleSubmit}>
                      <Box mb={2}>
                          <TextField
                            fullWidth
                            label="Name"
                            name="aname"
                            value={adminData.aname}
                            onChange={handleChange}
                            variant="outlined"
                            required
                          />
                      </Box>
                      <Box mb={2}>
                          <TextField
                            fullWidth
                            label="ID"
                            name="id"
                            value={adminData.id}
                            onChange={handleChange}
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
                            value={adminData.pw}
                            onChange={handleChange}
                            variant="outlined"
                            required
                          />
                      </Box>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                            py: 1,
                            fontWeight: "bold",
                            borderRadius: "8px",
                        }}
                      >
                          Sign Up
                      </Button>
                  </form>
              </CardContent>
          </Card>
      </Box>
    );
};

export default SignUpComponent;
