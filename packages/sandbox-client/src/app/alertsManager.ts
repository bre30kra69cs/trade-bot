import create from 'zustand';
import {nanoid} from 'nanoid';

type AlertItemInternal = {
  id: string;
  type: 'success' | 'danger' | 'warning';
  message: string;
  timeout: number;
};

type AlertItemExtrernal = Omit<AlertItemInternal, 'id'>;

type AlertsState = {
  alerts: AlertItemInternal[];
  pushAlert: (alert: AlertItemExtrernal) => string;
  removeAlert: (id: string) => void;
};

export const useAlerts = create<AlertsState>((set, get) => {
  return {
    alerts: [],
    pushAlert: (alert) => {
      const id = nanoid();

      set({
        alerts: [
          ...get().alerts,
          {
            id,
            ...alert,
          },
        ],
      });

      setTimeout(() => {
        get().removeAlert(id);
      }, alert.timeout);

      return id;
    },
    removeAlert: (id) => {
      if (get().alerts.every((item) => item.id !== id)) {
        return;
      }

      set({
        alerts: get().alerts.filter((item) => item.id !== id),
      });
    },
  };
});
