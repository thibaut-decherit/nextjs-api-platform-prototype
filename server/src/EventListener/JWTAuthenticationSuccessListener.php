<?php

namespace App\EventListener;

use App\Entity\User;
use Exception;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\RequestStack;

class JWTAuthenticationSuccessListener
{
    private string $cookieName;
    private string $cookiePrefix;
    private string $cookieSameSite;
    private bool $cookieSecure;
    private JWTEncoderInterface $JWTEncoder;

    public function __construct(
        string $cookieName,
        string $cookiePrefix,
        string $cookieSameSite,
        string $cookieSecure,
        JWTEncoderInterface $JWTEncoder,
        RequestStack $requestStack
    )
    {
        $this->cookieName = $cookieName;
        $this->cookiePrefix = $cookiePrefix;
        $this->cookieSameSite = $cookieSameSite;
        $this->cookieSecure = $cookieSecure === 'auto'
            ? !empty($requestStack->getMainRequest()->server->get('HTTPS'))
            : $cookieSecure;
        $this->JWTEncoder = $JWTEncoder;
    }

    /**
     * Sets JWT as a cookie on successful authentication.
     *
     * @param AuthenticationSuccessEvent $event
     * @throws Exception
     */
    public function onAuthenticationSuccess(AuthenticationSuccessEvent $event): void
    {
        $token = $this->JWTEncoder->decode($event->getData()['token']);
        $response = $event->getResponse();

        $response->headers->setCookie(
            new Cookie(
                // Cookie name, should be the same as in config/packages/lexik_jwt_authentication.yaml.
                $this->cookiePrefix . $this->cookieName,
                $event->getData()['token'], // cookie value
                $token['exp'], // expiration
                '/', // Path
                null, // domain, null means that Symfony will generate it on its own.
                $this->cookieSecure, // secure
                true, // httpOnly
                false, // raw
                $this->cookieSameSite // same-site parameter, can be 'lax' or 'strict'.
            )
        );

        /**
         * @var User $user
         */
        $user = $event->getUser();
        $response->headers->set('app-user-front-end-data-json', $user->buildFrontEndDataJson());
    }
}
