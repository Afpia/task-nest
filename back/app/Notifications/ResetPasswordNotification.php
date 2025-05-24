<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification
{
    protected $token;
    protected $email;


    public function __construct(string $token, string $email)
    {
        $this->token = $token;
        $this->email = $email;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

   public function toMail($notifiable)
    {
        $frontendUrl = config('app.frontend_url') . "/reset-password?token={$this->token}&email={$this->email}";

        return (new MailMessage)
            ->subject('Восстановление пароля')
            ->greeting('Здравствуйте!')
            ->line('Вы получили это письмо, потому что был сделан запрос на сброс пароля для вашей учётной записи.')
            ->action('Сбросить пароль', $frontendUrl)
            ->line('Если вы не запрашивали сброс пароля, вы можете проигнорировать это письмо.')
            ->salutation('С уважением, команда ' . config('app.name'));
    }
}
