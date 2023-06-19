<?php

namespace App\Entity;

use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

abstract class AbstractHistory
{
    #[ORM\Column]
    #[Groups(['read'])]
    protected DateTimeImmutable $createdAt;

    #[ORM\Column]
    #[Groups(['read'])]
    protected DateTimeImmutable $lastModifiedAt;

    public function __construct()
    {
        $this->createdAt = new DateTimeImmutable();
        $this->lastModifiedAt = $this->getCreatedAt();
    }

    public function getCreatedAt(): DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getLastModifiedAt(): DateTimeImmutable
    {
        return $this->lastModifiedAt;
    }

    public function updateLastModifiedAt(): static
    {
        $this->lastModifiedAt = new DateTimeImmutable();

        return $this;
    }
}
