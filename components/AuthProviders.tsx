"use client";

import { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";
import { Button } from "@/components/Button";
import { Icons } from "@/components/Icons";

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null;
}

type Providers = Record<string, Provider>;

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  const Icon = Icons["google"];

  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider: Provider, i) => (
          <Button
            key={i}
            onClick={() => signIn(provider?.id)}
            type="button"
            variant="outline"
            size="lg"
            className="text-light-white w-full"
          >
            <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
            {provider.id}
          </Button>
        ))}
      </div>
    );
  }
};

export default AuthProviders;
