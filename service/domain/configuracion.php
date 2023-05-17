<?php 

class configuracion{

    private $id;
    private $color;
    private $font_family;
    private $font_size;
    private $id_usuario;

    public function __construct($id, $color, $font_family, $font_size, $id_usuario){
        $this->id = $id;
        $this->color = $color;
        $this->font_family = $font_family;
        $this->font_size = $font_size;
        $this->id_usuario = $id_usuario;
    }

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getColor()
    {
        return $this->color;
    }

    public function setColor($color)
    {
        $this->color = $color;
    }

    public function getFont_family()
    {
        return $this->font_family;
    }

    public function setFont_family($font_family)
    {
        $this->font_family = $font_family;
    }

    public function getFont_size()
    {
        return $this->font_size;
    }

    public function setFont_size($font_size)
    {
        $this->font_size = $font_size;
    }

    public function getId_usuario()
    {
        return $this->id_usuario;
    }

    public function setId_usuario($id_usuario)
    {
        $this->id_usuario = $id_usuario;
    }
    
}
?>