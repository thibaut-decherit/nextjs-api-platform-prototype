<?php

namespace App\EventSubscriber;

use App\Entity\AbstractHistory;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Events;
use Doctrine\Persistence\Event\LifecycleEventArgs;

class HistoryUpdater implements EventSubscriber
{
    public function getSubscribedEvents(): array
    {
        return [
            Events::preUpdate
        ];
    }

    public function preUpdate(LifecycleEventArgs $eventArgs): void
    {
        $entity = $eventArgs->getObject();

        if ($entity instanceof AbstractHistory === false) {
            return;
        }

        $entity->updateLastModifiedAt();
    }
}
