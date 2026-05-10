import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { 
  Button, 
  CircularProgress, 
  Alert, 
  Box, 
  Paper, 
  Typography, 
  Divider 
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/profile`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <Paper 
      elevation={2} 
      sx={{ p: 4, borderRadius: 4, maxWidth: 500, mx: "auto", mt: 4 }}
    >
      <Box display="flex" alignItems="center" mb={2} gap={1}>
        <LockIcon fontSize="small" color="action" />
        <Typography variant="h6" fontWeight="600">
          Secure Checkout
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 3 }} />

      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement 
          id="payment-element" 
          options={{
            layout: "tabs", // Modern tab interface for Card/Afterpay/etc.
          }} 
        />

        {message && (
          <Alert severity="error" sx={{ mt: 3, borderRadius: 2 }}>
            {message}
          </Alert>
        )}

        <Button 
          type="submit"
          disabled={isProcessing || !stripe || !elements}
          variant="contained" 
          size="large" 
          fullWidth 
          sx={{ 
            bgcolor: "#57604b", 
            py: 1.8, 
            borderRadius: "12px", 
            fontSize: "1.1rem",
            fontWeight: "bold",
            mt: 4,
            boxShadow: "0 4px 12px rgba(87, 96, 75, 0.3)",
            "&:hover": { 
              bgcolor: "#3d4534",
              boxShadow: "0 6px 16px rgba(87, 96, 75, 0.4)",
            },
            "&:disabled": {
              bgcolor: "#d1d5db"
            }
          }}
        >
          {isProcessing ? (
            <CircularProgress size={26} sx={{ color: "white" }} />
          ) : (
            `Pay Now`
          )}
        </Button>

        <Typography 
          variant="caption" 
          display="block" 
          textAlign="center" 
          color="text.secondary" 
          sx={{ mt: 2 }}
        >
          Your payment information is encrypted and secure.
        </Typography>
      </form>
    </Paper>)
}