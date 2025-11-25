import { authService } from '@/services/auth';
import type { DeepLinkParams } from '@/types/auth';

/**
 * Handle deep linking from mobile apps (Android/iOS)
 * Supports universal links and custom URL schemes
 */
export class DeepLinkHandler {
  private static instance: DeepLinkHandler;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.initialize();
    }
  }

  static getInstance(): DeepLinkHandler {
    if (!DeepLinkHandler.instance) {
      DeepLinkHandler.instance = new DeepLinkHandler();
    }
    return DeepLinkHandler.instance;
  }

  private initialize(): void {
    // Handle universal links (iOS/Android)
    window.addEventListener('click', this.handleUniversalLink.bind(this));
    
    // Handle page load with deep link params
    if (window.location.search || window.location.hash) {
      this.processDeepLink();
    }
  }

  private handleUniversalLink(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const link = target.closest('a');
    
    if (link && link.href) {
      try {
        const url = new URL(link.href);
        if (this.isDeepLink(url)) {
          event.preventDefault();
          this.processUrl(url);
        }
      } catch {
        // Invalid URL, continue normally
      }
    }
  }

  private isDeepLink(url: URL): boolean {
    // Check if URL matches our app domain or custom scheme
    const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'inbo.app';
    const customScheme = process.env.NEXT_PUBLIC_DEEP_LINK_SCHEME || 'inbo://';
    
    return url.hostname.includes(appDomain) || url.protocol === customScheme;
  }

  private async processDeepLink(): Promise<void> {
    const url = new URL(window.location.href);
    this.processUrl(url);
  }

  private async processUrl(url: URL): Promise<void> {
    const params: DeepLinkParams = {};
    
    // Extract query parameters
    url.searchParams.forEach((value, key) => {
      params[key] = value;
    });

    // Extract hash parameters
    if (url.hash) {
      const hashParams = new URLSearchParams(url.hash.substring(1));
      hashParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    // Handle authentication token
    if (params.token) {
      try {
        await authService.deepLinkAuth(params);
        
        // Redirect after successful authentication
        const redirect = params.redirect || '/dashboard';
        window.location.href = redirect;
      } catch (error) {
        console.error('Deep link authentication failed:', error);
        window.location.href = '/auth/login?error=deep_link_failed';
      }
    }

    // Handle email verification
    if (params.email && params.verify) {
      window.location.href = `/auth/verify?email=${params.email}&token=${params.verify}`;
    }

    // Handle magic link
    if (params.magic_token) {
      try {
        await authService.verifyMagicLink(params.magic_token);
        window.location.href = params.redirect || '/dashboard';
      } catch (error) {
        console.error('Magic link verification failed:', error);
        window.location.href = '/auth/login?error=magic_link_failed';
      }
    }
  }

  /**
   * Generate deep link URL for mobile apps
   */
  static generateDeepLink(params: DeepLinkParams): string {
    const scheme = process.env.NEXT_PUBLIC_DEEP_LINK_SCHEME || 'inbo://';
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return `${scheme}auth?${query}`;
  }

  /**
   * Generate universal link (for iOS/Android)
   */
  static generateUniversalLink(params: DeepLinkParams): string {
    const domain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'inbo.app';
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return `https://${domain}/auth?${query}`;
  }
}

// Initialize deep link handler
if (typeof window !== 'undefined') {
  DeepLinkHandler.getInstance();
}

export default DeepLinkHandler;

