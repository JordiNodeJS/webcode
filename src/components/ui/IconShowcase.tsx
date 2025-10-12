"use client";

import { Icon } from "@/components/ui/Icon";
import {
  FaGithub,
  FaNodeJs,
  FaReact,
  HiOutlineLightBulb,
  HiOutlineRocketLaunch,
  HiOutlineSparkles,
  PiCoffee,
  PiFlowerTulip,
  PiScissors,
} from "@/lib/icons";

/**
 * Showcase del nuevo sistema de iconos
 * Demuestra iconos de múltiples familias con el componente Icon
 */
export function IconShowcase() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Sistema de Iconos WebCode</h1>
        <p className="text-muted-foreground">
          Múltiples familias de iconos para máxima originalidad
        </p>
      </div>
      {/* Heroicons - Características */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Heroicons - Características</h2>
        <div className="flex flex-wrap gap-8">
          <div className="text-center">
            <Icon
              icon={HiOutlineSparkles}
              size="3xl"
              variant="primary"
              aria-label="Sparkles"
            />
            <p className="text-sm mt-2">Sparkles</p>
          </div>
          <div className="text-center">
            <Icon
              icon={HiOutlineRocketLaunch}
              size="3xl"
              variant="secondary"
              aria-label="Rocket"
            />
            <p className="text-sm mt-2">Rocket</p>
          </div>
          <div className="text-center">
            <Icon
              icon={HiOutlineLightBulb}
              size="3xl"
              variant="accent"
              aria-label="Lightbulb"
            />
            <p className="text-sm mt-2">Lightbulb</p>
          </div>
        </div>
      </section>
      {/* Phosphor - Sectores */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Phosphor - Sectores Creativos</h2>
        <div className="flex flex-wrap gap-8">
          <div className="text-center">
            <Icon
              icon={PiFlowerTulip}
              size="3xl"
              variant="primary"
              aria-label="Floristería"
            />
            <p className="text-sm mt-2">Floristería</p>
          </div>
          <div className="text-center">
            <Icon
              icon={PiScissors}
              size="3xl"
              variant="secondary"
              aria-label="Peluquería"
            />
            <p className="text-sm mt-2">Peluquería</p>
          </div>
          <div className="text-center">
            <Icon
              icon={PiCoffee}
              size="3xl"
              variant="accent"
              aria-label="Cafetería"
            />
            <p className="text-sm mt-2">Cafetería</p>
          </div>
        </div>
      </section>{" "}
      {/* Font Awesome - Tecnologías */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Font Awesome - Tecnologías</h2>
        <div className="flex flex-wrap gap-8">
          <div className="text-center">
            <Icon
              icon={FaReact}
              size="3xl"
              variant="primary"
              aria-label="React"
            />
            <p className="text-sm mt-2">React</p>
          </div>
          <div className="text-center">
            <Icon
              icon={FaNodeJs}
              size="3xl"
              variant="secondary"
              aria-label="Node.js"
            />
            <p className="text-sm mt-2">Node.js</p>
          </div>
          <div className="text-center">
            <Icon
              icon={FaGithub}
              size="3xl"
              variant="default"
              aria-label="GitHub"
            />
            <p className="text-sm mt-2">GitHub</p>
          </div>
        </div>
      </section>
      {/* Tamaños */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Tamaños Disponibles</h2>
        <div className="flex items-end gap-8">
          <div className="text-center">
            <Icon icon={HiOutlineSparkles} size="xs" aria-label="Extra small" />
            <p className="text-sm mt-2">xs</p>
          </div>
          <div className="text-center">
            <Icon icon={HiOutlineSparkles} size="sm" aria-label="Small" />
            <p className="text-sm mt-2">sm</p>
          </div>
          <div className="text-center">
            <Icon icon={HiOutlineSparkles} size="md" aria-label="Medium" />
            <p className="text-sm mt-2">md</p>
          </div>
          <div className="text-center">
            <Icon icon={HiOutlineSparkles} size="lg" aria-label="Large" />
            <p className="text-sm mt-2">lg</p>
          </div>
          <div className="text-center">
            <Icon icon={HiOutlineSparkles} size="xl" aria-label="Extra large" />
            <p className="text-sm mt-2">xl</p>
          </div>
          <div className="text-center">
            <Icon icon={HiOutlineSparkles} size="2xl" aria-label="2XL" />
            <p className="text-sm mt-2">2xl</p>
          </div>
          <div className="text-center">
            <Icon icon={HiOutlineSparkles} size="3xl" aria-label="3XL" />
            <p className="text-sm mt-2">3xl</p>
          </div>
        </div>
      </section>
      {/* Variantes de Color */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Variantes de Color</h2>
        <div className="flex flex-wrap gap-8">
          <div className="text-center">
            <Icon
              icon={HiOutlineSparkles}
              size="2xl"
              variant="default"
              aria-label="Default"
            />
            <p className="text-sm mt-2">default</p>
          </div>
          <div className="text-center">
            <Icon
              icon={HiOutlineSparkles}
              size="2xl"
              variant="primary"
              aria-label="Primary"
            />
            <p className="text-sm mt-2">primary</p>
          </div>
          <div className="text-center">
            <Icon
              icon={HiOutlineSparkles}
              size="2xl"
              variant="secondary"
              aria-label="Secondary"
            />
            <p className="text-sm mt-2">secondary</p>
          </div>
          <div className="text-center">
            <Icon
              icon={HiOutlineSparkles}
              size="2xl"
              variant="accent"
              aria-label="Accent"
            />
            <p className="text-sm mt-2">accent</p>
          </div>
          <div className="text-center">
            <Icon
              icon={HiOutlineSparkles}
              size="2xl"
              variant="muted"
              aria-label="Muted"
            />
            <p className="text-sm mt-2">muted</p>
          </div>
          <div className="text-center">
            <Icon
              icon={HiOutlineSparkles}
              size="2xl"
              variant="success"
              aria-label="Success"
            />
            <p className="text-sm mt-2">success</p>
          </div>
          <div className="text-center">
            <Icon
              icon={HiOutlineSparkles}
              size="2xl"
              variant="destructive"
              aria-label="Destructive"
            />
            <p className="text-sm mt-2">destructive</p>
          </div>
        </div>
      </section>
    </div>
  );
}
