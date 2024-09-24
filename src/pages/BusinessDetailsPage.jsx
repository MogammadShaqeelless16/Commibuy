import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';
import Loader from '../components/Loader';
import Navigation from '../components/landingPage/Navigation';
import Header from '../components/landingPage/Header';
import AboutUs from '../components/landingPage/AboutUs';
import Services from '../components/landingPage/Services';
import Products from '../components/landingPage/Products';
import ContactDetails from '../components/landingPage/ContactDetails';
import ContactForm from '../components/landingPage/ContactForm';
import { Helmet } from 'react-helmet'; // Import Helmet

function BusinessDetailsPage() {
  const { businessSlug } = useParams();
  const [business, setBusiness] = useState(null);
  const [template, setTemplate] = useState('template2'); // Default to 'template1'
  const [font, setFont] = useState('Arial'); // Default font
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [mapCenter, setMapCenter] = useState([0, 0]);
  const [mapZoom, setMapZoom] = useState(16);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
    interest: ''
  });
  const [formStatus, setFormStatus] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    async function fetchBusinessDetails() {
      try {
        const { data: businessData, error: businessError } = await supabase
          .from('businesses')
          .select('*') // Include 'template' and 'font' in your select
          .eq('slug', businessSlug)
          .eq('registered', true)
          .single();

        if (businessError) throw businessError;
        setBusiness(businessData);

        // Set the template and font from the database
        if (businessData.template) {
          setTemplate(businessData.template);
        }
        if (businessData.font) {
          setFont(businessData.font);
        }

        if (businessData.latitude && businessData.longitude) {
          setMapCenter([businessData.latitude, businessData.longitude]);
        }

        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .eq('shop_id', businessData.id);

        if (productsError) throw productsError;
        setProducts(productsData);

        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*')
          .eq('shop_id', businessData.id);

        if (servicesError) throw servicesError;
        setServices(servicesData);
      } catch (error) {
        console.error('Error fetching business details:', error);
      }
    }

    fetchBusinessDetails();
  }, [businessSlug]);

  if (!business) return <Loader />;

  const handleMenuClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFormChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!business || !business.id) {
        console.error('Business ID is not available');
        setFormStatus('error');
        return;
      }

      const { error } = await supabase
        .from('leads')
        .insert([{
          business_uuid: business.id,
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
          interest: contactForm.interest,
          source: 'website'
        }]);

      if (error) throw error;

      setFormStatus('success');
      setShowSuccessPopup(true);

      setContactForm({
        name: '',
        email: '',
        message: '',
        interest: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    }
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div className="business-details-page" style={{ fontFamily: font }}>
      {/* Dynamically load the correct CSS template */}
      <Helmet>
        <link rel="stylesheet" href={`/templates/${template}.css`} />
      </Helmet>

      <Navigation business={business} handleMenuClick={handleMenuClick} />
      <Header business={business} />
      <AboutUs business={business} />
      <Services services={services} />
      <Products products={products} />
      <ContactDetails business={business} />
      {/* Pass the required props to ContactForm and include the Map component */}
      <div className="contact-us-container">
        <ContactForm
          contactForm={contactForm}
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
          formStatus={formStatus}
          showSuccessPopup={showSuccessPopup}
          handleClosePopup={handleClosePopup}
          mapCenter={mapCenter} // Pass mapCenter to ContactForm
          mapZoom={mapZoom}     // Pass mapZoom to ContactForm
          business={business}    // Pass business data to ContactForm
        />
      </div>
    </div>
  );
}

export default BusinessDetailsPage;
