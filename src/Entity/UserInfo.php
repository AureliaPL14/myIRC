<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UserInfoRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserInfoRepository::class)]
#[ApiResource]
class UserInfo extends AbstractEntity
{
    #[ORM\OneToOne(inversedBy: 'info', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $credentials = null;

    #[ORM\Column(length: 255)]
    private ?string $username = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $tag = null;

    #[ORM\OneToMany(mappedBy: 'founder', targetEntity: Server::class, orphanRemoval: true)]
    private Collection $foundedServers;

    public function __construct()
    {
        parent::__construct();
        $this->foundedServers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCredentials(): ?User
    {
        return $this->credentials;
    }

    public function setCredentials(User $credentials): self
    {
        $this->credentials = $credentials;

        return $this;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getTag(): ?int
    {
        return $this->tag;
    }

    public function setTag(int $tag): self
    {
        $this->tag = $tag;

        return $this;
    }

    /**
     * @return Collection<int, Server>
     */
    public function getFoundedServers(): Collection
    {
        return $this->foundedServers;
    }

    public function addFoundedServer(Server $foundedServer): self
    {
        if (!$this->foundedServers->contains($foundedServer)) {
            $this->foundedServers->add($foundedServer);
            $foundedServer->setFounder($this);
        }

        return $this;
    }

    public function removeFoundedServer(Server $foundedServer): self
    {
        if ($this->foundedServers->removeElement($foundedServer)) {
            // set the owning side to null (unless already changed)
            if ($foundedServer->getFounder() === $this) {
                $foundedServer->setFounder(null);
            }
        }

        return $this;
    }
}
