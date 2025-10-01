import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, Container, Paper, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../Axios/AxiosInstance';
import { getCategories } from '../../redux/reducers/allProductReducer';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: 400,
  margin: 'auto',
  marginTop: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  borderRadius: '10px',
  backgroundColor: 'rgba(255,255,255,0.9)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  fontSize: '1rem',
  backgroundColor: '#ff7b00',
  '&:hover': { backgroundColor: '#e06b00' },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: '#ff7b00',
  textDecoration: 'none',
  '&:hover': { textDecoration: 'underline' },
}));

// Validation schema
const AddProductSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Name too short').required('Required'),
  price: Yup.number().min(0, 'Price must be positive').required('Required'),
  category: Yup.string().required('Category is required'),
  description: Yup.string().min(10, 'Description too short').required('Required'),
  stock: Yup.number().min(0, 'Stock must be non-negative').integer('Stock must be an integer').required('Required'),
  imageUrl: Yup.string().url('Invalid URL').required('Image URL is required'),
});

const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        setCatLoading(true);
        const res = await getCategories();
        const catData = res.data.data || [];
        if (Array.isArray(catData)) {
          setCategories(catData);
        } else {
          console.error('Categories data is not an array:', catData);
          setCategories([]);
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError('Failed to load categories');
        setCategories([]);
      } finally {
        setCatLoading(false);
      }
    };

    fetchCategoriesData();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        ...values,
        price: Number(values.price),
        stock: Number(values.stock),
        images: [values.imageUrl],
      };

      await axiosInstance.post('/api/products', payload);
      navigate('/adminAllProduct');
    } catch (err) {
      console.error('Add product failed:', err);
      setError(err.response?.data?.message || err.message || 'Failed to add product');
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  if (catLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 200px)',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          bgcolor: '#042968ff',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '200px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: '20px',
          filter: 'brightness(50%)',
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          color="#ffffffff"
          sx={{ textShadow: '2px 2px 4px #051a3dff' }}
        >
          Add Product
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ minHeight: 'calc(100vh - 300px)', py: 4, backgroundColor: 'transparent' }}>
        <Container maxWidth="xs">
          <StyledPaper>
            <Typography variant="h6" color="#2c2c2c" gutterBottom>
              Add new product
            </Typography>

            <Formik
              initialValues={{
                name: '',
                price: '',
                category: '',
                description: '',
                stock: '',
                imageUrl: '',
              }}
              validationSchema={AddProductSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting, setFieldValue, values }) => (
                <Form>
                  <Box sx={{ mt: 1 }}>
                    <Field
                      as={TextField}
                      fullWidth
                      label="Product Name"
                      name="name"
                      variant="outlined"
                      margin="normal"
                      error={touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                    />
                    <Field
                      as={TextField}
                      fullWidth
                      label="Price"
                      name="price"
                      type="number"
                      variant="outlined"
                      margin="normal"
                      error={touched.price && !!errors.price}
                      helperText={touched.price && errors.price}
                    />
                    <FormControl fullWidth margin="normal" error={touched.category && !!errors.category}>
                      <InputLabel>Category</InputLabel>
                      <Field
                        as={Select}
                        name="category"
                        label="Category"
                        value={values.category || ''}
                        onChange={(e) => setFieldValue('category', e.target.value)}
                      >
                        {Array.isArray(categories) ? categories.map((cat) => (
                          <MenuItem key={cat._id || cat.id} value={cat._id || cat.id}>
                            {cat.cat_name}
                          </MenuItem>
                        )) : null}
                      </Field>
                      {touched.category && errors.category && (
                        <Typography variant="caption" color="error">
                          {errors.category}
                        </Typography>
                      )}
                    </FormControl>
                    <Field
                      as={TextField}
                      fullWidth
                      label="Description"
                      name="description"
                      multiline
                      rows={3}
                      variant="outlined"
                      margin="normal"
                      error={touched.description && !!errors.description}
                      helperText={touched.description && errors.description}
                    />
                    <Field
                      as={TextField}
                      fullWidth
                      label="Stock"
                      name="stock"
                      type="number"
                      variant="outlined"
                      margin="normal"
                      error={touched.stock && !!errors.stock}
                      helperText={touched.stock && errors.stock}
                    />
                    <Field
                      as={TextField}
                      fullWidth
                      label="Image URL"
                      name="imageUrl"
                      variant="outlined"
                      margin="normal"
                      error={touched.imageUrl && !!errors.imageUrl}
                      helperText={touched.imageUrl && errors.imageUrl}
                    />

                    {error && (
                      <Typography color="error" sx={{ mt: 1 }}>
                        {error}
                      </Typography>
                    )}

                    <StyledButton type="submit" fullWidth variant="contained" disabled={isSubmitting || loading}>
                      {loading ? 'Adding...' : 'Add Product'}
                    </StyledButton>

                    <StyledLink to="/addproduct">
                      Back to Products
                    </StyledLink>
                  </Box>
                </Form>
              )}
            </Formik>
          </StyledPaper>
        </Container>
      </Paper>
    </>
  );
};

export default AddProduct;