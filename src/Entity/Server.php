<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ServerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ServerRepository::class)]
#[ApiResource]
class Server extends AbstractEntity
{
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'foundedServers')]
    #[ORM\JoinColumn(nullable: false)]
    private ?UserInfo $founder = null;

    #[ORM\OneToMany(mappedBy: 'server', targetEntity: ServerIdentity::class, orphanRemoval: true)]
    private Collection $members;

    #[ORM\OneToMany(mappedBy: 'server', targetEntity: Channel::class, orphanRemoval: true)]
    private Collection $channels;

    public function __construct()
    {
        parent::__construct();
        $this->members = new ArrayCollection();
        $this->channels = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getFounder(): ?UserInfo
    {
        return $this->founder;
    }

    public function setFounder(?UserInfo $founder): self
    {
        $this->founder = $founder;

        return $this;
    }

    /**
     * @return Collection<int, ServerIdentity>
     */
    public function getMembers(): Collection
    {
        return $this->members;
    }

    public function addMember(ServerIdentity $member): self
    {
        if (!$this->members->contains($member)) {
            $this->members->add($member);
            $member->setServer($this);
        }

        return $this;
    }

    public function removeMember(ServerIdentity $member): self
    {
        if ($this->members->removeElement($member)) {
            // set the owning side to null (unless already changed)
            if ($member->getServer() === $this) {
                $member->setServer(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Channel>
     */
    public function getChannels(): Collection
    {
        return $this->channels;
    }

    public function addChannel(Channel $channel): self
    {
        if (!$this->channels->contains($channel)) {
            $this->channels->add($channel);
            $channel->setServer($this);
        }

        return $this;
    }

    public function removeChannel(Channel $channel): self
    {
        if ($this->channels->removeElement($channel)) {
            // set the owning side to null (unless already changed)
            if ($channel->getServer() === $this) {
                $channel->setServer(null);
            }
        }

        return $this;
    }
}
