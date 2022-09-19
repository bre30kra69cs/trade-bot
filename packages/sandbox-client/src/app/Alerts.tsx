import React, {FC} from 'react';
import Alert from 'react-bootstrap/Alert';

import {useAlerts} from './alertsManager';

export const Alerts: FC = () => {
  const alerts = useAlerts((state) => state.alerts);

  console.log(alerts);

  if (!alerts.length) {
    return null;
  }

  return (
    <article className="position-absolute bottom-0 end-0 p-2">
      {alerts.map((alert) => {
        return (
          <Alert
            key={alert.id}
            variant={alert.type}
            onClose={() => {
              useAlerts.getState().removeAlert(alert.id);
            }}
            dismissible
          >
            {alert.message}
          </Alert>
        );
      })}
    </article>
  );
};
