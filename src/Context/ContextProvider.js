import { AuthProvider } from './AuthProvider';
import { CartProvider } from './CartProvider';
import { PaydetailProvider } from './PayPageContext';
import { FunctionProvider } from './FunctionProvider';
import { SVGProvider } from './SVGProvider';
import { GeoLocationProvider } from './GeoLocationProvider';
import { SearchValueProvider } from './ShoppingValueProvider';

export default function ContextProviders({ children }) {
  return (
    <AuthProvider>
      <GeoLocationProvider>
        <FunctionProvider>
          <PaydetailProvider>
            <SVGProvider>
              <SearchValueProvider>
                <CartProvider>{children} </CartProvider>
              </SearchValueProvider>
            </SVGProvider>
          </PaydetailProvider>
        </FunctionProvider>
      </GeoLocationProvider>
    </AuthProvider>
  );
}
