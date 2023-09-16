import { Component, OnInit} from '@angular/core';
import { CellTower } from './cellTower';
import { HttpErrorResponse } from '@angular/common/http';
import { CellTowerService } from './cellTower.service';
import { NgForm } from '@angular/forms';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public cellTowers!: CellTower[];
  public editCellTower!: CellTower; 
  public deleteCellTower!: CellTower;

  title = 'apex-ng-13';
 
  ChangeView:Boolean = true
  visible:boolean=false
  onclick(){
    this.ChangeView = !this.ChangeView;
    this.visible = !this.visible;
  }

  chartSeries: ApexNonAxisChartSeries = [50, 50, 50, 49];
  chartDetails: ApexChart = {
    type: 'pie',
    toolbar: {
      show: true
    }
  };
  chartLabels = ["2G", "3G", "4G", "5G"];
  chartTitle: ApexTitleSubtitle = {
    text: 'Towers by Technology',
    align: 'center'
  };

  chartDataLabels: ApexDataLabels = {
    enabled: true
  };


  constructor(private celltowerService: CellTowerService) {}
  
  ngOnInit(){
    this.getCellTowers();
  }

  public getCellTowers(): void{
    this.celltowerService.getCellTowers().subscribe(
    (Response: CellTower[]) => {
      this.cellTowers = Response;
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    );
  }
  
  public onAddCellTower(addForm: NgForm): void {
    document.getElementById('add-cellTower-form')?.click();
    this.celltowerService.addCellTower(addForm.value).subscribe(
      (response: CellTower) => {
        console.log(response);
        this.getCellTowers();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateCellTower(cellTower: CellTower): void {
    this.celltowerService.updateCellTower(cellTower).subscribe(
      (response: CellTower) => {
        console.log(response);
        this.getCellTowers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteCellTower(cellTowerId: number): void {
    this.celltowerService.deleteCellTower(cellTowerId).subscribe(
      (response: void) => {
        console.log(response);
        this.getCellTowers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchCellTowers(key: string): void{
    console.log(key);
    const results: CellTower[] = []; 
    for(const cellTower of this.cellTowers) {
      if (cellTower.technology.toUpperCase().indexOf(key.toUpperCase()) !== -1
      || cellTower.operator.toUpperCase().indexOf(key.toUpperCase()) !== -1
      || cellTower.latitude.toString().indexOf(key.toString()) !== -1
      || cellTower.longitude.toString().indexOf(key.toString()) !== -1
      || cellTower.tower_id.toString().indexOf(key.toString()) !== -1
      || cellTower.tower_type.toUpperCase().indexOf(key.toUpperCase()) !== -1
      || cellTower.address.toString().indexOf(key.toString()) !== -1
      || cellTower.height.toString().indexOf(key.toString()) !== -1){
        results.push(cellTower);
      }
    }
    this.cellTowers = results;
    if (results.length === 0 || !key) {
      this.getCellTowers();
    }
  }

  public onOpenModal(cellTower: CellTower, mode: string): void {
    const container = document.getElementById("main-container")
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCellTowerModal');
    }
    if (mode === 'edit') {
      this.editCellTower = cellTower;
      button.setAttribute('data-target', '#updateCellTowerModal');
    }
    if (mode === 'delete') {
      this.deleteCellTower = cellTower;
      button.setAttribute('data-target', '#deleteCellTowereModal');
    }
    container?.appendChild(button);
    button.click();
  }


}


