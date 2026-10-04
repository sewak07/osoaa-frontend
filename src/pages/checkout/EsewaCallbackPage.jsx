import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import api from '../../services/api';

export const EsewaCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const dataParam = searchParams.get('data');
  const failedParam = searchParams.get('failed');

  const [status, setStatus] = useState('verifying'); // 'verifying' | 'success' | 'failed'
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (failedParam === 'true') {
      setStatus('failed');
      setErrorMessage('The eSewa transaction was cancelled or failed.');
      return;
    }

    if (!dataParam) {
      setStatus('failed');
      setErrorMessage('No payment callback data received from eSewa.');
      return;
    }

    const verifyTransaction = async () => {
      try {
        const response = await api.post('/payments/esewa/verify', { data: dataParam });
        if (response.data.success) {
          setStatus('success');
          const order = response.data.data;
          setTimeout(() => {
            navigate(`/order-success?orderNumber=${order.orderNumber}&orderId=${order.orderId}`);
          }, 2000);
        } else {
          setStatus('failed');
          setErrorMessage(response.data.message || 'Payment verification failed.');
        }
      } catch (err) {
        setStatus('failed');
        setErrorMessage(err.customMessage || 'Backend server-to-server signature verification failed.');
      }
    };

    verifyTransaction();
  }, [dataParam, failedParam, navigate]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 text-center bg-white">
      <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm space-y-6">
        
        {status === 'verifying' && (
          <div className="space-y-4">
            <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <h2 className="text-xl font-black text-brand-navy">Verifying eSewa Payment</h2>
            <p className="text-xs text-slate-500">
              Please wait while our backend performs secure server-to-server signature verification...
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-black text-brand-navy">Payment Verified!</h2>
            <p className="text-xs text-slate-600">
              Your transaction is confirmed. Redirecting you to your order summary...
            </p>
          </div>
        )}

        {status === 'failed' && (
          <div className="space-y-6">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-xl font-black text-brand-navy">Payment Verification Failed</h2>
              <p className="text-xs text-rose-600 mt-2">{errorMessage}</p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/account/orders"
                className="flex-1 py-3 bg-brand-navy hover:bg-navy-700 text-white text-xs font-bold rounded-xl shadow-sm"
              >
                View Orders
              </Link>
              <Link
                to="/checkout"
                className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-orange-sm"
              >
                Retry Checkout
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
