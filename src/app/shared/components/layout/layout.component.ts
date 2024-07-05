import { Component, Renderer2 } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,FooterComponent,MatSidenavModule,HeaderComponent,SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export default class LayoutComponent {
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.isLocalStorageAvailable()) {
      // Aplicar el modo oscuro si está en localStorage
      const theme = localStorage.getItem('theme');
      if (theme === 'dark') {
        this.renderer.addClass(document.body, 'dark');
      }

      // Escuchar el evento de clic en el botón de cambiar modo
      const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
      toggleDarkModeButton?.addEventListener('click', () => {
        if (document.body.classList.contains('dark')) {
          this.renderer.removeClass(document.body, 'dark');
          localStorage.setItem('theme', 'light');
        } else {
          this.renderer.addClass(document.body, 'dark');
          localStorage.setItem('theme', 'dark');
        }
      });

      // Configurar el botón de menú móvil
      this.setupMobileMenuButton();
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = 'test';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  private setupMobileMenuButton(): void {
    const menuButton = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');

    const hideSidebar = () => {
      sidebar?.classList.add('-translate-x-full');
      sidebar?.classList.remove('translate-x-0');
      mainContent?.classList.remove('ml-64');
    };

    // Función para ocultar el sidebar cuando se hace clic fuera de él en dispositivos móviles
    const hideSidebarOnOutsideClick = (event: Event) => {
      if (sidebar && !sidebar.contains(event.target as Node)) {
        hideSidebar();
        document.removeEventListener('click', hideSidebarOnOutsideClick);
      }
    };

    menuButton?.addEventListener('click', (event) => {
      event.stopPropagation(); // Detener la propagación para evitar cerrar inmediatamente el sidebar
      sidebar?.classList.toggle('translate-x-0');
      sidebar?.classList.toggle('-translate-x-full');
      mainContent?.classList.toggle('ml-64');

      if (sidebar?.classList.contains('translate-x-0')) {
        // Agregar un listener para cerrar el sidebar cuando se hace clic fuera de él
        document.addEventListener('click', hideSidebarOnOutsideClick);
      } else {
        document.removeEventListener('click', hideSidebarOnOutsideClick);
      }
    });

    // Asegurarse de que el sidebar esté inicialmente oculto en dispositivos móviles
    const mediaQuery = window.matchMedia('(max-width: 428px)');
    const handleResize = () => {
      if (mediaQuery.matches) {
        hideSidebar();
      } else {
        sidebar?.classList.remove('-translate-x-full');
        mainContent?.classList.add('ml-64');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
  }


  
}
