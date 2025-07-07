import { FC, useMemo, useEffect } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { selectUser } from '../../services/slices/authSlice';
import {
  clearConstructor,
  selectConstructorBurger
} from '../../services/slices/constructorSlice';
import {
  clearCurrentOrder,
  createOrder,
  selectOrdersCurrentOrder,
  selectOrdersLoading
} from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const { bun, ingredients = [] } = useSelector(selectConstructorBurger);
  const isLoading = useSelector(selectOrdersLoading);
  const currentOrder = useSelector(selectOrdersCurrentOrder);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(
    () => () => {
      if (currentOrder) {
        dispatch(clearCurrentOrder());
      }
    },
    [dispatch, currentOrder]
  );

  const onOrderClick = () => {
    if (!bun || isLoading) return;

    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    const orderItems = [
      bun._id,
      ...ingredients.map((ingredient) => ingredient._id),
      bun._id
    ];

    dispatch(createOrder(orderItems));
  };

  const closeOrderModal = () => {
    dispatch(clearConstructor());
    dispatch(clearCurrentOrder());
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce((sum, item) => sum + item.price, 0),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={isLoading}
      constructorItems={{ bun, ingredients }}
      orderModalData={currentOrder}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
